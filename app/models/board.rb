class Board < ApplicationRecord
  # belongs_to :user
  has_many :lists

  validates :title, presence: true, length: { maximum: 30 }
  # validates :user_id, presence: true

end
