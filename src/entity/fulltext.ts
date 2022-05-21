import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  BaseEntity,
} from "typeorm";

@Entity()
export class Fulltext extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ fulltext: true })
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

  static addData({
    review,
    date,
    rating,
    author,
    review_id,
    movie_id,
  }: Fulltext) {
    return this.createQueryBuilder()
      .insert()
      .into(Fulltext)
      .values({ review, date, rating, author, review_id, movie_id })
      .execute();
  }

  static deleteData() {
    return this.createQueryBuilder().delete().from(Fulltext).execute();
  }
}
