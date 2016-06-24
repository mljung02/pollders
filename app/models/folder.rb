class Folder < ActiveRecord::Base
  belongs_to :user
  has_many :polls, dependent: :destroy
  validates :name, presence: true
end
