import { Confirmation, Message } from 'primeng/api';

const ERROR_MESSAGES = {
  load: 'Não foi possível carregar os produtos',
  create: 'Não foi possível criar o produto',
  update: 'Não foi possível atualizar o produto',
  delete: 'Não foi possível deletar o produto',
} as Record<string, string>;

export const PRODUCTS_LIST_CONSTANTS = {
  MODAL_CONFIRMATION: {
    message: `Tem certeza que deseja deletar esse produto?`,
    header: 'Confirmar Exclusão',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim, deletar',
    rejectLabel: 'Cancelar',
    acceptButtonStyleClass: 'p-button-danger',
  } as Confirmation,

  CREATE_PRODUCT_SUCCESS_MESSAGE: {
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Produto criado com sucesso',
  } as Message,

  UPDATE_PRODUCT_SUCCESS_MESSAGE: {
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Produto atualizado com sucesso',
  } as Message,

  DELETE_PRODUCT_SUCCESS_MESSAGE: {
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Produto deletado com sucesso',
  } as Message,

  SHOW_ERROR_MESSAGE: (operation: string): Message => ({
    severity: 'error',
    summary: 'Erro',
    detail: ERROR_MESSAGES[operation] || 'Ocorreu um erro',
  }),
};
