class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.user = User.find(params[:user_id])

    if @comment.save
      rendered_comment = render_to_string(partial: 'comments/comment', locals: { comment: @comment })
      ActionCable.server.broadcast "comment_channel_#{@comment.user.event_id}", { comment: rendered_comment }
    else
      redirect_to event_path(params[:event_url_slug]), alert: "There was an error creating the comment."
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
