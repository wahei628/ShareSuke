class EventsController < ApplicationController
  def index
    @events = Event.all
    @comments = Comment.all # 全てのコメントを取得
  end

  def show
    @event = Event.find_by(url_slug: params[:url_slug])
    if @event
      @dates = @event.schedules.build
      @users = @event.users
      @user = User.new
      @comments = Comment.all # 全てのコメントを取得
      @comment = Comment.new
    else
      redirect_to events_path
    end
  end

  def new
    @event = Event.new
    @event.schedules.new
  end
  
  def create
    @event = Event.new(event_params.except(:dates))
    @event.password=(params[:password]) if params[:password].present?
    if @event.save
      params[:event][:dates].split(',').map { |date| date.strip }.reject(&:empty?).uniq.each do |date|
        @event.schedules.create(date: Date.strptime(date, '%Y-%m-%d'))
      end
      redirect_to url_share_event_path(@event.url_slug), notice: "Event was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def url_share
    @event = Event.find_by(url_slug: params[:url_slug])
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :password, :dates)
  end
end
