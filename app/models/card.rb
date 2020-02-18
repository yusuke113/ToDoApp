class Card < ApplicationRecord
  belongs_to :list

  validates :name, presence: true, length: { maximum: 255 }
end
