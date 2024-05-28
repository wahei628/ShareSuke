class Comment < ApplicationRecord
  # Comment ∋o--①--++ User
  belongs_to :user

  # ユニークバリデーション
  validates :user_id, uniqueness: { scope: :event_id }
end
