import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);

  const productRepo = dataSource.getRepository('Product');
  await productRepo.insert([
    {
      id: '3bb2c737-1f29-4517-8ef7-a15db8ccf65b',
      name: 'Mouse',
      description: 'Mouse gamer',
      price: 200,
      image_url:
        'https://bright.com.br/produtos/gamer/mouse-gamer/39-mouse-gamer-light-novo-modelo',
    },
    {
      id: 'f0fafad1-cfb1-4a6c-b998-c678345aa3ac',
      name: 'Cadeira',
      description: 'Cadeira gamer',
      price: 1000,
      image_url:
        'https://www.xtracer.com.br/cadeiras-gamer/viking/cadeira-gamer-e-escritorio-xt-racer-viking-rosa-com-apoio-para-os-pes',
    },
    {
      id: 'fbf6a2d7-ebf6-4aa0-8fca-d2140765cf75',
      name: 'Produto 3',
      description: 'Produto 3',
      price: 150,
      image_url:
        'https://www.istockphoto.com/br/banco-de-imagens/natureza-e-paisagens',
    },
  ]);
  await app.close();
}
bootstrap();
