import { Table, Column, CreatedAt, UpdatedAt, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
  @PrimaryKey
  @Column
  public email!: string;

  @Column
  is_admin: boolean = false;

  @Column
  public password!: string;

  @Column
  @CreatedAt
  public created_at: Date = new Date();

  @Column
  @UpdatedAt
  public updated_at: Date = new Date();

  short() { return { email: this.email } };
};
