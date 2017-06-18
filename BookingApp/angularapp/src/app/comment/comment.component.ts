import { Component, OnInit } from '@angular/core';
import { Comment } from '../model/comment';
import { AlertService } from '../auth-services/index';
import { CommentService } from '../services/comment-service.component';
import { NgForm } from '@angular/forms';
import { InlineEditorComponent } from 'ng2-inline-editor';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})

export class CommentComponent implements OnInit {

  model: any = {};
  comments: Array<Comment>;
  isVisible: boolean = false;

  constructor(
    private commentService: CommentService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.commentService
      .getAll()
      .subscribe(comments => {
        this.comments = comments;
      })
  }

  onSave(comm: Comment) {
    console.log("editing comment: " + JSON.stringify(comm));
    this.commentService.update(comm)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.alertService.success('Comment edited successfully', true);
      },
      error => {
        this.alertService.error(error);
      });
  }

  onSubmit(comm: Comment, form: NgForm) {
    console.log("new comment: " + JSON.stringify(comm));
    this.commentService.post(comm)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.alertService.success('Comment posted successfully', true);
      },
      error => {
        this.alertService.error(error);
      });
    form.reset();
    this.isVisible = false;
  }

  removeComment(comm: Comment) {
    console.log("removing comment: " + JSON.stringify(comm));
    this.commentService.delete(comm.Id)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.alertService.success('Comment removed successfully', true);
      },
      error => {
        this.alertService.error(error);
      });
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }


}