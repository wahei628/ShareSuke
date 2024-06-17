class Event < ApplicationRecord
  # Event ++--②--o∈ User 
  has_many :users, dependent: :destroy
  
  # Event ++--③--+∈ Schedule
  has_many :schedules, dependent: :destroy
  accepts_nested_attributes_for :schedules, allow_destroy: true, reject_if: :all_blank

  validates :title, presence: true
  validates :url_slug, presence: true
end
