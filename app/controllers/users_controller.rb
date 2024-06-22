class UsersController < ApplicationController
  def create
    @event = Event.find(params[:event_id])
    @user = User.new(user_params.merge(event_id: @event.id))
    if @user.save
      redirect_to event_user_path(@event, @user), notice: "User was successfully created."
    else
      redirect_to event_path(@event), alert: "There was an error creating the user."
    end
  end

  def edit
    @event = Event.find(params[:event_id])
    @user = @event.users.find(params[:id])
    @users = @event.users
  end

  def update
    @event = Event.find(params[:event_id])
    @user = @event.users.find(params[:id])
    if @user.update(user_params)
      redirect_to event_path(@event), notice: "User was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @event = Event.find(params[:event_id])
    @user = @event.users.find(params[:id])
    @user.destroy
    redirect_to event_path(@event), notice: "User was successfully deleted."
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
