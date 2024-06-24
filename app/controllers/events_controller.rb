class EventsController < ApplicationController
  def index
    @events = Event.all
  end

  def show
    @event = Event.find_by(url_slug: params[:url_slug])
    if @event
      @dates = @event.schedules.build
      @users = @event.users
      @user = User.new
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
