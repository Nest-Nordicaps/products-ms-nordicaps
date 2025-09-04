import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

//TODO: Se probo y funciona corectamente con el proxy de NATS
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Crear un producto
  @MessagePattern({ cmd: 'create_product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // Todos los productos
  @MessagePattern({ cmd: 'find_all_products' })
  findAll() {
    return this.productsService.findAll();
  }

  // Buscar un producto por ID
  @MessagePattern({ cmd: 'find_product' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // Actualizar un producto
  @MessagePattern({ cmd: 'update_product' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  // Eliminar un producto
  @MessagePattern({ cmd: 'remove_product' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  // Validacion de productos por lista de IDs
  @MessagePattern({ cmd: 'validate_products' })
  async validateProducts(@Payload('ids') ids: number[]) {
    return this.productsService.validateProducts(ids);
  }
}
