class CardsController < ApplicationController

def show

end

# def create
#   card = Card.new(card_params)
#   if card.save
#     redirect_to card.list.board
#   else
#     redirect_to card.list.board, alert: 'error'
#   end
# end
def create
  @card = Card.new(card_params)
  respond_to do |format|
    if @card.save
      format.html { redirect_to @card.board }
      format.json { render :show, status: :created }
      format.js
      # redirect_to @list.board
    else
      format.html { render :show }
      format.json { render :show, status: :unprocessable_entity }
      # render :show, alert: 'error'
    end
  end
end

def destroy
  @card = Card.find(params[:id])
  respond_to do |format|
    if @card.destroy
      format.html { redirect_to @card.board }
      format.json { render :show, status: :no_content }
      format.js
    else
      format.html { redirect_to @card.board }
      format.json { render :show, status: :internal_server_error }
    end
  end
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
