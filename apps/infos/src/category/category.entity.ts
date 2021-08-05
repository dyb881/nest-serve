import { Entity } from 'typeorm';
import { InfoCategoryEntity } from '@app/public-class';

@Entity()
export class Category extends InfoCategoryEntity {}
