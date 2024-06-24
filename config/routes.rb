Rails.application.routes.draw do
  root 'top#index'
  resources :events, only: %i[index new create show], param: :url_slug do
    member do
      get :url_share
    end
    resources :users, only: %i[create edit update destroy]
  end

end
