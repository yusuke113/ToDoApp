class CardsController < ApplicationController

def show

end

def create
  card = Card.new(card_params)
  if card.save
    redirect_to card.list.board
  else
    redirect_to card.list.board, alert: 'error'
  end
end

def destroy
  card = Card.find(params[:id])
  card.destroy
  redirect_to card.list.board
end

def update
  card = Card.find(params[:id])
  card.update(card_params)

  redirect_to card.list.board
end

private

  def card_params
    params.require(:card).permit(:list_id, :name)
  end

end
