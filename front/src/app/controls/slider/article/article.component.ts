import { Component, Input } from '@angular/core';
import { Article } from 'src/interfaces/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less']
})
export class ArticleComponent {
	@Input() article: Article = {} as Article;
}
