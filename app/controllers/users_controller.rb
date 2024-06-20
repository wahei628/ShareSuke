class UsersController < ApplicationController
  def create
    @event = Event.find(params[:event_id])
    @user = User.new(user_params.merge(event_id: @event.id))
    if @user.save
      redirect_to event_path(@event), notice: "User was successfully created."
    else
      redirect_to event_path(@event), alert: "There was an error creating the user."
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
