class Position < ApplicationRecord
  belongs_to :portfolio
  belongs_to :coin
  validates :entry_date, presence: true
  validates :coin, presence: true
 # validates :quantity, presence: true, unless: ->(position){position.amount.presence?}
 # validates :amount, presence: true, unless: ->(position){position.quantity.presence?}
end
