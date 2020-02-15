require 'rails_helper'


RSpec.describe Board, type: :model do
  before do
    @board = build(:board)
  end

  describe 'validation' do
    context 'valid' do
      
      it 'is valid with a title and user_id'

    end

    context 'invalid' do
      
      it 'is invalid without a title' do
        @board.title = ''
        expect(@board.valid?).to eq(false)
      end
      
      it 'is invalid without a user_id'

    end
    
  end
end