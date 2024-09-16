import { Body, Controller, Delete, Get, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Req, Session, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { productService } from "../service/product.service";
import { productDTO } from "../DTO/product.dto";
import { RolesGuard } from "src/guards/roles.guards";
import { Roles } from "src/database/users/decorators/roles.decorator";
import { userEntity } from "src/database/entity/user.entity";
import { CurrentUser } from "src/database/users/decorators/current-user.decorator";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller('products')
export class productController {
  constructor(private productService: productService) { }

  @Get()
  findAll() {
    return this.productService.productAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.productOne(+id)
  }

  // @Delete(":id")
  // async deleteUser(@Param('id') id : string) {
  //     return await this.productService.delete(+id)
  // }
  @Put(":id")
  async updateUser(@Param("id", ParseIntPipe) id: number, @Body() updateUser: productDTO) {
    return await this.productService.updateProduct(id, updateUser)
  }

  @UseGuards(RolesGuard)
  @Roles(['ADMIN'])
  @UseInterceptors(FilesInterceptor('files', 3))
  @Post()
  async createPro(@Body() newPro: productDTO,
    @CurrentUser() currentUser: userEntity,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10_000_000
        })
        .build(),
    )
    files: Array<Express.Multer.File>,) {
    return await this.productService.createProduct(newPro, currentUser, files)
  }



}