import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ unique: true })
  public readonly uid: string;

  @Column()
  public readonly firstName: string;

  @Column()
  public readonly lastName: string;

  @Column({ default: true })
  public readonly isActive: boolean;
}
