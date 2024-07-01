class EventsController < ApplicationController
  before_action :set_event, except: %i[index create new]
  def index
    @events = Event.all
    @comments = Comment.all # 全てのコメントを取得
  end

  def show
    if @event.password_hash.blank? || session[:event_access]
      @dates = @event.schedules.build
      @users = @event.users
      @user = User.new
      @comments = Comment.all # 全てのコメントを取得
      @comment = Comment.new
    else
      redirect_to entry_password_event_path(@event.url_slug)
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

  # URL表示画面
  def url_share; end

  # パスワード入力画面遷移
  def entry_password; end

  # パスワードの認証チェック
  def post_entry_password
    if @event.password == params[:password]
      # セッションにidを保存
      session[:event_access] = true
      redirect_to event_path(@event.url_slug)
    else
      flash[:alert] = "パスワードが違います"
      render :entry_password, status: :unprocessable_entity
    end
  end

  private

  def set_event
    @event = Event.find_by(url_slug: params[:url_slug])
  end

  def event_params
    params.require(:event).permit(:title, :description, :password, :dates)
  end
end
