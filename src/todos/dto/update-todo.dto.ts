import { IsString, IsNotEmpty, IsOptional, IsBoolean, isString } from "class-validator";

export class UpdateTodoDto{

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

}