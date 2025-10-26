import { Confirmation, Message } from 'primeng/api';

export const PRODUCTS_LIST_CONSTANTS = {
  MODAL_CONFIRMATION: {
    message: `Tem certeza que deseja deletar esse produto?`,
    header: 'Confirmar Exclusão',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim, deletar',
    rejectLabel: 'Cancelar',
    acceptButtonStyleClass: 'p-button-danger',
  } as Confirmation,

  LOAD_PRODUCTS_ERROR_MESSAGE: {
    severity: 'error',
    summary: 'Erro',
    detail: 'Não foi possível carregar os produtos',
  } as Message,

  CREATE_PRODUCT_SUCCESS_MESSAGE: {
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Produto criado com sucesso',
  } as Message,

  CREATE_PRODUCT_ERROR_MESSAGE: {
    severity: 'error',
    summary: 'Erro',
    detail: 'Não foi possível criar o produto',
  } as Message,

  UPDATE_PRODUCT_SUCCESS_MESSAGE: {
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Produto atualizado com sucesso',
  } as Message,

  UPDATE_PRODUCT_ERROR_MESSAGE: {
    severity: 'error',
    summary: 'Erro',
    detail: 'Não foi possível atualizar o produto',
  } as Message,

  DELETE_PRODUCT_SUCCESS_MESSAGE: {
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Produto deletado com sucesso',
  } as Message,

  DELETE_PRODUCT_ERROR_MESSAGE: {
    severity: 'error',
    summary: 'Erro',
    detail: 'Não foi possível deletar o produto',
  } as Message,
};
