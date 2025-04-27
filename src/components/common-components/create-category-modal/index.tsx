import { useState } from 'react';
import { Input, Modal } from 'antd';

import { TransitionEnum } from '@/types/transition';

import styles from './styles.module.css';

type Props = {
  type: TransitionEnum;
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onAddCategory: (name: string, color: string) => void;
};

const BLACK_COLOR = '#000000';

export const CreateCategoryModal = ({ type, loading, isOpen, onClose, onAddCategory }: Props) => {
  const [newCategory, setNewCategory] = useState('');
  const [newColor, setNewColor] = useState(BLACK_COLOR);

  const handleClose = () => {
    onClose();
    setNewCategory('');
    setNewColor(BLACK_COLOR);
  };

  const handleSaveCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim(), newColor);
      handleClose();
    }
  };

  return (
    <Modal
      title={`Новая категория ${type === TransitionEnum.EXPENSE ? 'расходов' : 'доходов'}`}
      open={isOpen}
      confirmLoading={loading}
      onOk={handleSaveCategory}
      onCancel={handleClose}
      okText="Добавить"
      cancelText="Отмена"
    >
      <div className={styles.wrapper}>
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Введите название категории"
          maxLength={30}
        />
        <input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          className={styles.inputColor}
        />
      </div>
    </Modal>
  );
};
