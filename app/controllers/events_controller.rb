class EventsController < ApplicationController
  def index
    @events = Event.all
  end

  def new
    @event = Event.new
    @event.schedules.new
  end
  
  def create
    @event = Event.new(event_params.except(:dates))
    if @event.save

      params[:event][:dates].split(',').map { |date| date.strip }.reject(&:empty?).uniq.each do |date|
        @event.schedules.create(calendar_date: Date.strptime(date, '%Y-%m-%d'))
      end

      redirect_to @event, notice: "Event was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @event = Event.find_by(url_slug: params[:url_slug])
    @dates = @event.schedules.build
  end

    private

    def event_params
      params.require(:event).permit(:title, :description, :password, :dates)
    end
end
