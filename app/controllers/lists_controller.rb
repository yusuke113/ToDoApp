class ListsController < ApplicationController

  def create
    list = List.new(list_params)
    if list.save
      redirect_to list.board
    else
      render :show, alert: 'error'
    end
  end

  def destroy
    list = List.find(params[:id])
    list.destroy
    redirect_to list.board
  end

  private

    def list_params
      params.require(:list).permit(:board_id, :name)
    end
  
end
