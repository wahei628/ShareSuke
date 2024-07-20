class UserSchedulesController < ApplicationController
  protect_from_forgery with: :null_session  # CSRF対策無効化し外部からのPOSTリクエストを受け付ける

  def index
    user_schedules = UserSchedule.all
    render json: user_schedules # 一覧をjson形式で返す
  end

  def create
    user_schedule = UserSchedule.find_or_initialize_by(user_id: user_schedule_params[:user_id], schedule_id: user_schedule_params[:schedule_id])
    user_schedule.status = user_schedule_params[:status]

    if user_schedule.save
      render json: { message: 'Success' }, status: :ok
    else
      render json: { message: 'Error', errors: user_schedule.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_schedule_params
    params.require(:user_schedule).permit(:user_id, :schedule_id, :status)
  end
end
