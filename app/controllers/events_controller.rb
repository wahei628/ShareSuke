class EventsController < ApplicationController
  def index
    @events = Event.all
  end

  def new
    @event = Event.new
    @event.schedules.new
  end
p
  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to event_path(@event.friendly_id), notice: "Event was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @event = Event.find_by(url_slug: params[:url_slug])
    @schedules = @event.schedules.build
  end

    private

    def event_params
      params.require(:event).permit(:title, :description, :password, schedules_attributes: [:id, :event_id, :calendar_date, :_destroy])
    end
end
