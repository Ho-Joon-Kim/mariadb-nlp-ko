import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
} from "typeorm";

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column("varchar")
  review!: string;

  @Column()
  date!: string;

  @Column()
  rating!: string;

  @Column()
  author!: string;

  @Column()
  review_id!: string;

  @Column()
  movie_id!: string;

  static addData({ review, date, rating, author, review_id, movie_id }: Like) {
    return this.createQueryBuilder()
      .insert()
      .into(Like)
      .values({ review, date, rating, author, review_id, movie_id })
      .execute();
  }

  static deleteData() {
    return this.createQueryBuilder().delete().from(Like).execute();
  }
}
