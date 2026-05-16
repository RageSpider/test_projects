import json
import csv

def update_json_from_csv(json_filepath, csv_filepath, output_filepath):
    # Dictionary to store the CSV results
    csv_results = {}
    
    try:
        # Read the CSV file
        # Using utf-8-sig to handle potential Byte Order Marks (BOM) in the CSV
        with open(csv_filepath, mode='r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            for row in reader:
                q_num = row.get('Question', '').strip()
                if q_num:
                    csv_results[q_num] = {
                        'Student': row.get('Student', '').strip(),
                        'Correct': row.get('Correct', '').strip()
                    }
    except FileNotFoundError:
        print(f"Error: Could not find '{csv_filepath}'. Please ensure the file is in the same folder.")
        return

    try:
        # Read the JSON file
        with open(json_filepath, mode='r', encoding='utf-8') as f:
            json_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: Could not find '{json_filepath}'. Please ensure the file is in the same folder.")
        return

    # Update JSON data based on the CSV mapping
    updated_count = 0
    for item in json_data:
        # Extract question number (e.g., changes "Question 76" to "76")
        q_text = item.get('question_number', '')
        q_num = q_text.replace('Question', '').strip()

        if q_num in csv_results:
            correct_ans = csv_results[q_num]['Correct']
            student_ans = csv_results[q_num]['Student']
            
            # Update the specific fields
            item['correct_answer'] = correct_ans
            item['student_answer'] = student_ans
            
            # Update the category based on whether the answers match
            if correct_ans == student_ans:
                item['category'] = 'Correct'
            else:
                item['category'] = 'Incorrect'
                
            updated_count += 1
        else:
            print(f"Warning: Question {q_num} was not found in the CSV.")

    # Write the updated JSON to a new file
    with open(output_filepath, mode='w', encoding='utf-8') as f:
        # ensure_ascii=False keeps the Bengali characters intact
        json.dump(json_data, f, ensure_ascii=False, indent=4)
        
    print(f"Successfully updated {updated_count} questions!")
    print(f"Your accurate data has been saved to: {output_filepath}")

if __name__ == "__main__":
    # Ensure these file names match your actual files
    INPUT_JSON = '76-100.json'
    INPUT_CSV = 'exam_results.csv'
    OUTPUT_JSON = 'updated_76-100.json'
    
    update_json_from_csv(INPUT_JSON, INPUT_CSV, OUTPUT_JSON)