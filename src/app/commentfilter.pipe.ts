import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '@angular/compiler';

@Pipe({
  name: 'commentfilter'
})
export class CommentfilterPipe implements PipeTransform {

  transform(comments, key) {
    return comments.filter(comment => {
        return comment.postID === key;
    });
  }

}
