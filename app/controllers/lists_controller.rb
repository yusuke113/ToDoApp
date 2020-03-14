class ListsController < ApplicationController

  def create
    @list = List.new(list_params)
    respond_to do |format|
      if @list.save
        format.html { redirect_to @list.board }
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
    list = List.find(params[:id])
    list.destroy
    redirect_to list.board
  end

  private

    def list_params
      params.require(:list).permit(:board_id, :name)
    end
  
end
