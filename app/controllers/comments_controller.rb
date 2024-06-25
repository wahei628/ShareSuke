class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.user = User.find(params[:user_id])

    if @comment.save
      redirect_to event_path(params[:event_url_slug]), notice: "Comment was successfully created."
    else
      redirect_to event_path(params[:event_url_slug]), alert: "There was an error creating the comment."
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
