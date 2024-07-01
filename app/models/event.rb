require 'bcrypt'

class Event < ApplicationRecord
  include BCrypt
  # Event ++--②--o∈ User 
  has_many :users, dependent: :destroy
  # Event ++--③--+∈ Schedule
  has_many :schedules, dependent: :destroy

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

  # 認証用メソッド, passwordがなければ新しく生成
  def password
    return nil if password_hash.blank?
    BCrypt::Password.new(password_hash)
  end

  # passwordを新規で作成
  def password=(new_password)
    if new_password.blank?
      self.password_hash = nil
    else
      @password = BCrypt::Password.create(new_password)
      self.password_hash = @password
    end
  end

end
