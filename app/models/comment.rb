class Comment < ApplicationRecord
  # Comment ∋o--①--++ User
  belongs_to :user

  validates :body, presence: true


end
