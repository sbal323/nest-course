import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name:"Reports"
})
export class Report{

  @PrimaryGeneratedColumn({
    name:"Id"
  })
  id: number;

  @Column({
    name:"Price"
  })
  price: number;
}
