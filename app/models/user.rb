class User < ApplicationRecord
  # User ++--①--o∈ Comment
  has_many :comments, dependent: :destroy
  
  # User ∋o--②--++ Event
  belongs_to :event

  # User ++--④--+∈ UserSchedule ∋+--⑤--++ Schedule
  has_many :user_schedules, dependent: :destroy
  has_many :schedules, through: :user_schedules
  validates :name, presence: true, length: { maximum: 15 }
end
