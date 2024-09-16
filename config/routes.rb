Rails.application.routes.draw do
  root 'top#index'
  get 'privacy', to: 'top#privacy'
  get 'terms', to: 'top#terms'
  resources :events, only: %i[index new create show], param: :url_slug do
    member do
      get :url_share
      get :entry_password
      post :post_entry_password
    end
    resources :users, only: %i[create edit update destroy]
    resources :comments, only: [:create]
  end
  resources :user_schedules, only: [:index, :create]
end
