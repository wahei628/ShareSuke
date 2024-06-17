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
      redirect_to events_path, notice: "Event was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

    private

    def event_params
      params.require(:event).permit(:title, :description, :url_slug, :password, schedules_attributes: [:id, :event_id, :date, :_destroy])
    end
end
