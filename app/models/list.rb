class List < ApplicationRecord
  belongs_to :board

  validates :name, presence: true, length: { maximum: 30 }
end
