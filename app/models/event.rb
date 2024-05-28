class Event < ApplicationRecord
  # Event ++--②--o∈ User 
  has_many :users, dependent: :destroy
  
  # Event ++--③--+∈ Schedule
  has_many :schedules, dependent: :destroy
  
end
