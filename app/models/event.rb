class Event < ApplicationRecord
  # Event ++--②--o∈ User 
  has_many :users, dependent: :destroy
  
  # Event ++--③--+∈ Schedule
  has_many :schedules, dependent: :destroy
  accepts_nested_attributes_for :schedules, allow_destroy: true, reject_if: :all_blank

  validates :title, presence: true
  validates :url_slug, presence: true

  before_validation :random_slug, on: :create # バリデーション前に実行

  extend FriendlyId # モジュールのメソッドをクラスメソッドとして追加
  
  friendly_id :random_slug, use: :slugged, slug_column: 'url_slug' # urlをランダムにする

  def random_slug        # 30文字のランダムな文字列を生成
    # url_slug ある場合は return
    return url_slug unless url_slug.blank?
    
    # whileloop true 
    temp_slug = SecureRandom.hex(15)
    while Event.exists?(url_slug: temp_slug)
      temp_slug = SecureRandom.hex(15)
    end

    # Event.url_slug に temp_slug を格納
    self.url_slug = temp_slug if url_slug.blank?
  end
end
