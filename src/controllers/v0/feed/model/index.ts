import { Table, Column, CreatedAt, UpdatedAt, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export default class Feed extends Model<Feed> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

  @Column
  public caption!: string;

  @Column
  public url!: string;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  @Column
  @UpdatedAt
  public updatedAt: Date = new Date();
};
