import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 12345678,
    description: 'DNI del usuario',
  })
  dniUs!: number;

  @ApiProperty({
    example: 'contraseña123',
    description: 'Contraseña del usuario',
  })
  passwordU!: string;
}
