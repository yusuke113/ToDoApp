class ListsController < ApplicationController

  def create
    list = List.new(list_params)
    if list.save
      redirect_to list.board
    else
      render 'show'
    end
  end

  def destroy
  end

  private

    def list_params
      params.require(:list).permit(:board_id, :name)
    end
  
end
