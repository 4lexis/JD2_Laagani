import { Component, OnInit } from '@angular/core';
import { Comment } from '../model/comment';
import { AlertService } from '../auth-services/index';
import { CommentService } from '../services/comment-service.component';
import { NgForm } from '@angular/forms';
import { InlineEditorComponent } from 'ng2-inline-editor';

@Component({
  selector: 'app-comment',
  templateUrl: './index.html'
})

export class CommentComponent implements OnInit {

  model: any = {};
  comments: Array<Comment>;
  isVisible: boolean = false;
  currentUser: string;
  currentRole: string;
  currentComment: Comment = new Comment();

  constructor(
    private commentService: CommentService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getComments();
    this.currentRole = localStorage.getItem("currentRole");
    this.currentUser = localStorage.getItem("currentUser");
  }

  getComments() {
    this.commentService
      .getAll()
      .subscribe(comments => {
        this.comments = comments;
      })
  }

  editComment() {
    console.log("editing comment: " + JSON.stringify(this.currentComment));
    this.commentService.update(this.currentComment)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.alertService.success('Comment edited successfully', true);
      },
      error => {
        this.alertService.error(error);
      });
  }

  submitComment(comm: Comment, form: NgForm) {
    //console.log("new comment: " + JSON.stringify(comm));
    
    if (form.valid) {
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
    } else {
      this.alertService.error("Error while posting comment!");
    }
  }

  removeComment() {
    console.log("removing comment  " + JSON.stringify(this.currentComment));
    this.commentService.delete(this.currentComment.Id)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.alertService.success('Comment removed successfully', true);
      },
      error => {
        this.alertService.error(error);
      });
  }

  dropComment() {
    this.currentComment = new Comment();
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  getComment(comm: Comment) {
    this.currentComment = comm;
    console.log("current comment: " + JSON.stringify(this.currentComment));
  }


}