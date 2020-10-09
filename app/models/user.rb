class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable #:confirmable sendgridが凍結したので一時的にメール認証OFF
  has_many :boards, dependent: :destroy

  validates :username, presence: true, length: { maximum: 30 }
  validates :email, presence: true, length: { maximum: 255 }

  # デフォルトでremenber_meを使用する
  def remember_me
    true
  end

end
