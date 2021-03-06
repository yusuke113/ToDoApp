class ListsController < ApplicationController
  before_action :logged_in_user

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
    @list = List.find(params[:id])
    respond_to do |format|
      if @list.destroy
        format.html { redirect_to @list.board }
        format.json { render :show, status: :no_content }
        format.js
      else
        format.html { redirect_to @list.board }
        format.json { render :show, status: :internal_server_error }
      end
    end
  end

  # def update
  #   @list = List.find(params[:id])
  #     if @list.update(list_params)
  #       redirect_to @list.board
  #     else
  #       redirect_to @list.board 
  #     end
  # end

  def update
    @list = List.find(params[:id])
    respond_to do |format|
      if @list.update(list_params)
        format.html { redirect_to @list.board }
        format.json { render :show, status: :no_content }
        format.js
      else
        format.html { redirect_to @list.board }
        format.json { render :show, status: :internal_server_error }
      end
    end
  end

  private

    def list_params
      params.require(:list).permit(:board_id, :name)
    end
  
end
